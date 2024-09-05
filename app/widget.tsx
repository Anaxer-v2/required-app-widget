import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationProgress from '../components/ApplicationProgress';

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

// Expose the init function to the global scope
(window as any).RequiredWidget = {
  init: initWidget,
};
