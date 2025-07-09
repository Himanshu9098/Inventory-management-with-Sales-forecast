import pandas as pd
import matplotlib.pyplot as plt
import pmdarima as pm
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_squared_error, mean_absolute_error
from math import sqrt

# Load your sales data into a pandas DataFrame
data = pd.read_csv('mock_kaggle.csv')
data['Date'] = pd.to_datetime(data['Date'], format='%d-%m-%Y')
data.set_index('Date', inplace=True)

#Plotting the Sales data
data['Sales'].plot(figsize=(12, 5))

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
plt.show()

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
plt.show()

rmse = sqrt(mean_squared_error(pred, test['Sales']))
mae = mean_absolute_error(pred, test['Sales'])
print(f"Rmse is {rmse}")
print(f"Mae is {mae}")

# Determine the integer positions for the forecast range
forecast_start = len(data)
forecast_end = len(data) + 29  # Assuming 30 days forecast
index_future_dates = pd.date_range(start='2016-08-01', periods=30, freq='D')  # Specify the date range for forecasting

#autoarima_model = pm.auto_arima(data['Sales'], seasonal=True, m=30, stepwise=True, trace=True, suppress_warnings=True)
#best_order = autoarima_model.order
#best_seasonal_order = autoarima_model.seasonal_order

# Extract the individual components
#best_p, best_d, best_q = best_order
#best_P, best_D, best_Q, best_S = best_seasonal_order

# Re-train the SARIMA model on the entire dataset
sarima_model_full = SARIMAX(data['Sales'], order=(1, 1, 1), seasonal_order=(0, 0, 1, 30))
sarima_model_full = sarima_model_full.fit(disp=0)

# Generate predictions for the next 30 days
forecast = sarima_model_full.predict(start=forecast_start, end=forecast_end)
forecast.index = index_future_dates

# Plot the SARIMA forecast
plt.figure(figsize=(12, 6))
plt.plot(index_future_dates, forecast, label='SARIMA Forecast')
plt.title('SARIMA Forecast for the Next 30 Days')
plt.xlabel('Date')
plt.ylabel('Sales')
plt.legend()
plt.show()