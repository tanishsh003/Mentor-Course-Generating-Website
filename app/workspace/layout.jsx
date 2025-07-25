import WorkspaceProvider from './provider'
import React from 'react'

function WorkspaceLayout({children}) {
  return (
    <WorkspaceProvider>
      {children}
    </WorkspaceProvider>
  )
}

export default WorkspaceLayout
