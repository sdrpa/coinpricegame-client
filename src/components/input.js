import React from 'react'

const Input = (field) => {
   const { meta: { touched, error } } = field
   
   const err = (error) 
      ? error.split('\n').map((string, index) => { return <div key={index}>{string}</div>})
      : error

   let placeholder = field.placeholder
   if (!placeholder) {
      placeholder = field.isRequired === true ? 'Required' : 'Optional'
   }
   const className = field.className || 'form-control'
   
   const renderLabel = field => {
      if (!field.label) {
         return
      }
      return field.label
   }
   
   return (
      <div className="form-group">
         {renderLabel(field)}
         <input
            className={`${className} ${touched && error ? 'is-invalid' : ''}`}
            type={field.type}
            placeholder={placeholder}
            spellCheck={field.spellCheck}
            {...field.input}
         />
         <div className="text-help">
            {touched ? err : ''}
         </div>
      </div>
   )
}

export default Input
