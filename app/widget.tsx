import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationProgress from '../components/ApplicationProgress';

interface RequiredWidget {
  init: () => void;
}

declare global {
  interface Window {
    RequiredWidget: RequiredWidget;
  }
}

// Function to initialize the widget
function initWidget() {
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'required-widget-root';
  document.body.appendChild(widgetContainer);

  ReactDOM.render(
    <React.StrictMode>
      <ApplicationProgress />
    </React.StrictMode>,
    widgetContainer
  );
}

// Expose the init function to the global scope immediately
(function(window: Window) {
  window.RequiredWidget = {
    init: initWidget,
  };
})(window);
