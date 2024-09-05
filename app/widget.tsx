import React from 'react';
import ReactDOM from 'react-dom/client';
import ApplicationProgress from '../components/ApplicationProgress';
import '../fonts.css';  // Add this line
import '../app/globals.css';  // Add this line

function initWidget(containerId?: string) {
  try {
    let widgetContainer: HTMLElement | null;
    
    if (containerId) {
      widgetContainer = document.getElementById(containerId);
      if (!widgetContainer) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
      }
    } else {
      widgetContainer = document.createElement('div');
      widgetContainer.id = 'required-widget-root';
      document.body.appendChild(widgetContainer);
    }

    const root = ReactDOM.createRoot(widgetContainer);
    root.render(
      <React.StrictMode>
        <ApplicationProgress />
      </React.StrictMode>
    );

    console.log('RequiredWidget initialized successfully.');
  } catch (error) {
    console.error('Error initializing RequiredWidget:', error);
  }
}

// Export the function directly
export { initWidget };