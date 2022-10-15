import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';

import { SignIn } from '.';

export default {
  title: 'Pages/SignIn',
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/sessions', (req, res, ctx) => {
          return res(ctx.json({ message: 'Login realizado!' }));
        }),
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.type(
      canvas.getByPlaceholderText('Digite seu e-mail'),
      'bruno@gmail.com'
    );
    userEvent.type(canvas.getByPlaceholderText('******'), '123456');

    userEvent.click(canvas.getByRole('button'));

    waitFor(() => {
      return expect(canvas.getByText('Login realizado!')).toBeInTheDocument();
    });
  },
};
