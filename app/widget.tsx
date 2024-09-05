import React from 'react';
import ReactDOM from 'react-dom/client';
import ApplicationProgress from '../components/ApplicationProgress';

console.log('Widget script executing');

interface RequiredWidget {
  init: (containerId?: string) => void;
}

declare global {
  interface Window {
    RequiredWidget: RequiredWidget;
  }
}

// Function to initialize the widget
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

// Export the init function
export const RequiredWidget: RequiredWidget = {
  init: initWidget,
};

if (typeof window !== 'undefined') {
  console.log('Attaching RequiredWidget to window');
  window.RequiredWidget = RequiredWidget;
  console.log('RequiredWidget attached:', window.RequiredWidget);
}