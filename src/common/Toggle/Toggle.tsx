import { useState } from 'react'
import { Switch } from '@headlessui/react'

export function Toggle({
  enabled, setEnabled,name
}:{
  enabled: boolean,
  setEnabled: (enabled: boolean) => void
  name: string
}) {
  return (
    <div>
      {name} {'  '}
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable Notificaton</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
    </div>

  )
}