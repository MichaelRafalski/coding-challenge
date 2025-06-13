import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The checked state of the toggle',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the toggle state changes',
    },
    label: {
      control: 'text',
      description: 'Optional label text for the toggle',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// Basic toggle without label
export const Basic: Story = {
  args: {
    checked: false,
    onChange: (checked) => console.log('Toggle changed:', checked),
  },
};

// Toggle with label
export const WithLabel: Story = {
  args: {
    checked: false,
    label: 'Enable Feature',
    onChange: (checked) => console.log('Toggle changed:', checked),
  },
};

// Checked state
export const Checked: Story = {
  args: {
    checked: true,
    label: 'Feature Enabled',
    onChange: (checked) => console.log('Toggle changed:', checked),
  },
};



// Interactive example
export const Interactive: Story = {
  args: {
    checked: false,
    label: 'Click me!',
  },
  parameters: {
    docs: {
      description: {
        story: 'Try clicking the toggle or its label to see it in action.',
      },
    },
  },
}; 