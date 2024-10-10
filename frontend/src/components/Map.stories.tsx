import type { Meta, StoryObj } from '@storybook/react'

import Map from './Map'

const meta = {
  title: 'Map',
  component: Map,
} satisfies Meta<typeof Map>

export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    session: {
      id: 1,
      latitude: 52.51058096504199,
      longitude: 13.40665022976207,
      sessionId: '1',
      timestamp: 1728578469000,
    },
  },
}
