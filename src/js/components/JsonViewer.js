import React from 'react'
import JsonObject from './DataTypes/Object'
import ArrayGroup from './ArrayGroup'
import filterSrc from './../helpers/filterSrc'

export default class extends React.PureComponent {
  render = () => {
    const { props } = this
    let src = props.src
    if (props.searchTerm) {
      // Filter the src object based on the search term
      src = filterSrc(src, props.searchTerm)
      if (!src) {
        return <div class='no-results'>No results found</div>
      }
    }
    let namespace = [props.name]
    let ObjectComponent = JsonObject
    if (typeof props.name === 'object' && !Array.isArray(props.name)) {
      // Support Classes and Functional Components
      const ComponentName =
        props.name?.displayName || props.name?.name || props.name?.type?.name
      namespace = [ComponentName || 'Anonymous']
    }

    if (
      Array.isArray(src) &&
      props.groupArraysAfterLength &&
      props.src.length > props.groupArraysAfterLength
    ) {
      ObjectComponent = ArrayGroup
    }

    return (
      <div class='pretty-json-container object-container'>
        <div class='object-content'>
          <ObjectComponent
            namespace={namespace}
            depth={0}
            jsvRoot
            {...props}
            src={src}
          />
        </div>
      </div>
    )
  }
}
