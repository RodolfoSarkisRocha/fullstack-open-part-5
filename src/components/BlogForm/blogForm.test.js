import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

describe('blog form tests', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn();
    const handleInputs = jest.fn();

    const component = render(
      <BlogForm handleBlogSubmit={createBlog} handleBlogInputs={handleInputs} />
    );

    const author = component.container.querySelector('#author');
    const title = component.container.querySelector('#title');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(author, {
      target: { value: 'Rodolfo Sarkis' },
    });
    fireEvent.change(title, {
      target: { value: 'Testing in React' },
    });
    fireEvent.change(url, {
      target: { value: 'www.facebook.com' },
    });

    fireEvent.submit(form);

    waitFor(() => {
      expect(createBlog.mock.calls).toHaveLength(1);
    });

    waitFor(() => {
      expect(createBlog.mock.calls[0][0].content).toBe(
        'Rodolfo Sarkis'
      );
      expect(createBlog.mock.calls[0][1].content).toBe(
        'Testing in React'
      );
      expect(createBlog.mock.calls[0][2].content).toBe(
        'www.facebook.com'
      );
    });
  });
});
