/**
 * @jest-environment jsdom
 */

const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
} = require('../index')

describe('DOM Testing and User Behavior Simulation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="simulate-click">Simulate Click</button>
      <div id="dynamic-content"></div>
      <div id="error-message" class="hidden"></div>
      <form id="user-form">
        <input type="text" id="user-input" />
        <button type="submit">Submit</button>
      </form>
    `
    // Load the script to attach event listeners
    require('../index')
    // Trigger DOMContentLoaded to attach event listeners
    document.dispatchEvent(new Event('DOMContentLoaded'))
  })

  it('should have the button element present', () => {
    const button = document.getElementById('simulate-click')
    expect(button).toBeTruthy()
    expect(button.tagName).toBe('BUTTON')
    expect(button.textContent).toBe('Simulate Click')
  })

  it('should have the form and input elements present', () => {
    const form = document.getElementById('user-form')
    const input = document.getElementById('user-input')
    expect(form).toBeTruthy()
    expect(form.tagName).toBe('FORM')
    expect(input).toBeTruthy()
    expect(input.type).toBe('text')
    expect(input.placeholder).toBe('') // since not set in test HTML
  })

  it('should have the dynamic content and error message elements', () => {
    const dynamicContent = document.getElementById('dynamic-content')
    const errorMessage = document.getElementById('error-message')
    expect(dynamicContent).toBeTruthy()
    expect(errorMessage).toBeTruthy()
    expect(errorMessage.classList.contains('hidden')).toBe(true)
  })

  it('should add an element to the DOM', () => {
    addElementToDOM('dynamic-content', 'Hello, World!')
    const dynamicContent = document.getElementById('dynamic-content')
    expect(dynamicContent.textContent).toContain('Hello, World!')
  })

  it('should remove an element from the DOM', () => {
    const element = document.createElement('div')
    element.id = 'test-element'
    document.body.appendChild(element)

    removeElementFromDOM('test-element')
    expect(document.getElementById('test-element')).toBeNull()
  })

  it('should simulate a button click and update the DOM', () => {
    simulateClick('dynamic-content', 'Button Clicked!')
    const dynamicContent = document.getElementById('dynamic-content')
    expect(dynamicContent.textContent).toContain('Button Clicked!')
  })

  it('should handle button click event and update the DOM', () => {
    const button = document.getElementById('simulate-click')
    button.dispatchEvent(new Event('click'))
    const dynamicContent = document.getElementById('dynamic-content')
    expect(dynamicContent.textContent).toContain('Button Clicked!')
  })

  it('should handle form submission and update the DOM', () => {
    const input = document.getElementById('user-input')
    input.value = 'Test Input'

    handleFormSubmit('user-form', 'dynamic-content')
    const dynamicContent = document.getElementById('dynamic-content')
    expect(dynamicContent.textContent).toContain('Test Input')
  })

  it('should display an error message for empty input', () => {
    handleFormSubmit('user-form', 'dynamic-content')
    const errorMessage = document.getElementById('error-message')
    expect(errorMessage.textContent).toBe('Input cannot be empty')
    expect(errorMessage.classList.contains('hidden')).toBe(false)
  })
})
