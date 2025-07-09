from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import csv
import matplotlib
matplotlib.use('Agg')  # Use the 'Agg' backend which is non-GUI
import matplotlib.pyplot as plt
import pmdarima as pm
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_squared_error, mean_absolute_error
from statsmodels.tsa.stattools import adfuller
from math import sqrt
import warnings

# Filter out the specific FutureWarning
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=UserWarning)
app = Flask(__name__)
CORS(app)

@app.route('/')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    uploaded_file = request.files['file']
    seasonality = int(request.form.get('seasonality'))

    # Check if the file has a valid name
    if uploaded_file.filename == '':
        return jsonify({'error': 'Empty file name'})
    
    # Load your sales data into a pandas DataFrame
    data = pd.read_csv(uploaded_file)

    data['Date'] = pd.to_datetime(data['Date'], format='%d-%m-%Y')
    data.set_index('Date', inplace=True)
    print(data)
    # Get the minimum and maximum dates from the DataFrame
    min_date = data.index.min()
    max_date = data.index.max()

    # Create a date range covering the entire date range with daily frequency
    date_range = pd.date_range(start=min_date, end=max_date, freq='D')

    # Reindex the DataFrame with the complete date range and fill missing entries with zeros
    data = data.reindex(date_range, fill_value=0)

    #Plotting the Sales data
    #data['Sales'].plot(figsize=(12, 5))

    # Split the data into training and testing sets
    train = data.iloc[:-30]  # Train on the first n-30 data points
    test = data.iloc[-30:]   # Test on the last 30 data points

    # Use pmdarima to find the best SARIMA parameters
    #autoarima_model = pm.auto_arima(train['Sales'], seasonal=True, m=12, stepwise=True, trace=True, suppress_warnings=True)
    #best_order = autoarima_model.order
    #best_seasonal_order = autoarima_model.seasonal_order

    # Extract the individual components
    #best_p, best_d, best_q = best_order
    #best_P, best_D, best_Q, best_S = best_seasonal_order
    #print(best_p, best_d, best_q, best_P, best_D, best_Q, best_S)

    # Train the SARIMA model with the best parameters
    sarima_model = SARIMAX(train['Sales'], order=(1, 1, 1), seasonal_order=(1, 0, 2, 7))
    sarima_model = sarima_model.fit(disp=0)  # Set disp=0 to suppress warnings

    print(sarima_model.summary())

    residuals = sarima_model.resid
    plt.figure(figsize=(12, 6))
    plt.plot(residuals)
    plt.title('Residuals Plot')
    plt.close()

    start = len(train) 
    end = len(train) + len(test) - 1
    pred = sarima_model.predict(start=start, end=end, typ='levels').rename('SARIMA Predictions')
    pred.index = test.index

    plt.figure(figsize=(12, 6))
    plt.plot(pred, label='SARIMA Predictions')
    plt.plot(test['Sales'], label='Actual Sales')
    plt.legend()
    plt.title('SARIMA Predictions vs. Actual Sales')
    plt.xlabel('Date')
    plt.ylabel('Sales')
    plt.close()

    rmse = sqrt(mean_squared_error(pred, test['Sales']))
    mae = mean_absolute_error(pred, test['Sales'])
    print(f"Rmse is {rmse}")
    print(f"Mae is {mae}")

    # Determine the integer positions for the forecast range
    forecast_start = len(data)
    forecast_end = len(data) + 29  # Assuming 30 days forecast
    last_date = data.index[-1]  # Get the last date in your dataset
    prev_start_date = last_date - pd.DateOffset(days=29) 
    start_date = last_date + pd.DateOffset(days=1)  # Add one day to the last date
    index_future_dates = pd.date_range(start=start_date, periods=30, freq='D')  # Specify the date range for forecasting
    index_actual_sales_dates = pd.date_range(start=prev_start_date, end=last_date, freq='D')  # Specify the date range for the last 30 days
    #autoarima_model = pm.auto_arima(data['Sales'], seasonal=True, m=30, stepwise=True, trace=True, suppress_warnings=True)
    #best_order = autoarima_model.order
    #best_seasonal_order = autoarima_model.seasonal_order

    # Extract the individual components
    #best_p, best_d, best_q = best_order
    #best_P, best_D, best_Q, best_S = best_seasonal_order
    
    #previous 30 days
    actual_sales_last_30_days = data['Sales'][-30:]

    # Re-train the SARIMA model on the entire dataset
    sarima_model_full = SARIMAX(data['Sales'], order=(1, 1, 1), seasonal_order=(0, 0, 1, seasonality))
    sarima_model_full = sarima_model_full.fit(disp=0)

    # Generate predictions for the next 30 days
    forecast = sarima_model_full.predict(start=forecast_start, end=forecast_end)
    forecast.index = pd.DatetimeIndex(index_future_dates)
    actual_sales_last_30_days.index = pd.DatetimeIndex(index_actual_sales_dates)

   
    # Plot the SARIMA forecast
    plt.figure(figsize=(12, 6))
    plt.plot(index_future_dates, forecast, label='SARIMA Forecast')
    plt.title('SARIMA Forecast for the Next 30 Days')
    plt.xlabel('Date')
    plt.ylabel('Sales')
    plt.legend()
    plt.close()

    labels = forecast.index.strftime('%d-%m').tolist()  # Assuming you want date strings as labels
    sarimaData = forecast.tolist()  # Convert forecast to a list
    prev_labels = actual_sales_last_30_days.index.strftime('%d-%m').tolist()

    response_data = {
        'prev_labels': prev_labels,
        'labels': labels,
        'sarimaData': sarimaData,
        'actualSalesLast30Days': actual_sales_last_30_days.tolist()
    }
    
    return jsonify({'forecast': response_data}) 

if __name__ == '__main__':
    app.run(debug=True, port=8000)