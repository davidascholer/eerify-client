import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../app/App';
import { PATHS } from '../app/paths';

function renderRoute(path: string) {
  // Set the window location for memory router used during Vitest
  window.history.pushState({}, '', path);
  return render(<App />);
}

// Helper to assert no ErrorBoundary caught error in production mode. In DEV, ErrorFallback rethrows.
function expectNoErrorBoundary() {
  // We check that the error UI is not present (by title text)
  const alertTitle = screen.queryByText(/runtime error/i);
  expect(alertTitle).toBeNull();
}

describe('Pages render without hitting ErrorBoundary', () => {
  it('renders Home at ROOT', () => {
    renderRoute(PATHS.ROOT);
    // Expect something stable on the home page
    expect(document.body).toBeDefined();
    expectNoErrorBoundary();
  });

  it('renders Film list', () => {
    renderRoute(PATHS.FILM);
    expect(document.body).toBeDefined();
    expectNoErrorBoundary();
  });

  it('renders Games list', () => {
    renderRoute(PATHS.GAMES);
    expect(document.body).toBeDefined();
    expectNoErrorBoundary();
  });

  it('renders Books list', () => {
    renderRoute(PATHS.BOOKS);
    expect(document.body).toBeDefined();
    expectNoErrorBoundary();
  });

  it('renders UserAuth', () => {
    renderRoute(PATHS.USER_AUTH);
    expect(document.body).toBeDefined();
    expectNoErrorBoundary();
  });

  it('renders Settings', () => {
    renderRoute(PATHS.SETTINGS);
    expect(document.body).toBeDefined();
    expectNoErrorBoundary();
  });

  it('renders Notifications', () => {
    renderRoute(PATHS.NOTIFICATIONS);
    expect(document.body).toBeDefined();
    expectNoErrorBoundary();
  });

  it('renders Favorites', () => {
    renderRoute(PATHS.FAVORITES);
    expect(document.body).toBeDefined();
    expectNoErrorBoundary();
  });

  it('renders Activate by dynamic route', () => {
    renderRoute('/activate/uid/token');
    expect(document.body).toBeDefined();
    expectNoErrorBoundary();
  });

  it('renders Password Reset by dynamic route', () => {
    renderRoute('/password-reset/uid/token');
    expect(document.body).toBeDefined();
    expectNoErrorBoundary();
  });
});
