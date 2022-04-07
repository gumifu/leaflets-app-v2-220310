import React from 'react'
import { ChangeThemeButton } from './ChangeThemeButton'

export const HeaderTest = () => {
  return (
    <header className="space-y-4 p-4 sm:px-8 sm:py-4 lg:p-4 xl:px-8 xl:py-4">
      <div className="flex items-center justify-between">
        <span className="group inline-flex items-center text-xl font-medium pl-2 pr-3 py-2">
          <ChangeThemeButton />
        </span>
      </div>
    </header>
  )
}
