import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('blog component', () => {
  let component;
  const updateBlog = jest.fn();
  const blog = {
    author: 'Howard Spec',
    title: 'About Birds',
    likes: 16,
    url: 'www.testing.com',
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} updateBlog={updateBlog} />);
  });

  test('only render author and title', () => {
    expect(component.container).toHaveTextContent('About Birds');
    expect(component.container).toHaveTextContent('Howard Spec');
    expect(component.container).not.toHaveTextContent('www.testing.com');
    expect(component.container).not.toHaveTextContent('16');
  });

  test('renders url and number of likes when toggle is clicked', () => {
    const toggleButton = component.getByText('View details');
    fireEvent.click(toggleButton);

    expect(component.container).toHaveTextContent('www.testing.com');
    expect(component.container).toHaveTextContent('16');
  });

  test('if like is clicked twice, triggers it\'s function twice', () => {
    const likeButton = component.container.querySelector('.like-button');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});
