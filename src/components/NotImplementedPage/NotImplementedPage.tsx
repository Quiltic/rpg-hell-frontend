import React from 'react'

type Props = {pageName: string}

export default function NotImplementedPage(props: Props = {pageName: ""}) {
  return (
    <div>Page Not Implemented{props?.pageName ? `: ${props.pageName}` : ""}</div>
  )
}