import type { Meta, StoryObj } from '@storybook/react';
import { SessionMap } from './SessionMap';

const samplePositions = [
  {
    id: 1,
    sessionId: 'session-1',
    timestamp: '2024-03-20T10:00:00Z',
    latitude: 40.7128,
    longitude: -74.0060,
  },
  {
    id: 2,
    sessionId: 'session-1',
    timestamp: '2024-03-20T10:01:00Z',
    latitude: 40.7138,
    longitude: -74.0070,
  },
  {
    id: 3,
    sessionId: 'session-1',
    timestamp: '2024-03-20T10:02:00Z',
    latitude: 40.7148,
    longitude: -74.0080,
  },
];

const meta: Meta<typeof SessionMap> = {
  title: 'Components/SessionMap',
  component: SessionMap,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    sessionId: {
      control: 'text',
      description: 'Unique identifier for the session',
    },
    positions: {
      control: 'object',
      description: 'Array of GPS positions for the session',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the map is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SessionMap>;

export const Basic: Story = {
  args: {
    sessionId: 'session-1',
    positions: samplePositions,
    onClick: () => console.log('Map clicked'),
  },
};

// Map with a single position
export const SinglePosition: Story = {
  args: {
    sessionId: 'session-2',
    positions: [{
      id: 1,
      sessionId: 'session-2',
      timestamp: '2024-03-20T10:00:00Z',
      latitude: 40.7128,
      longitude: -74.0060,
    }],
    onClick: () => console.log('Map clicked'),
  },
};

// Map with a longer track
export const LongTrack: Story = {
  args: {
    sessionId: 'session-3',
    positions: [
      ...samplePositions,
      {
        id: 4,
        sessionId: 'session-3',
        timestamp: '2024-03-20T10:03:00Z',
        latitude: 40.7158,
        longitude: -74.0090,
      },
      {
        id: 5,
        sessionId: 'session-3',
        timestamp: '2024-03-20T10:04:00Z',
        latitude: 40.7168,
        longitude: -74.0100,
      },
    ],
    onClick: () => console.log('Map clicked'),
  },
};

