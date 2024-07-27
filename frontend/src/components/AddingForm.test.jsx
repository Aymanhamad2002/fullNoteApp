import {render,screen} from '@testing-library/react'
import AddingForm from './AddingForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async() => {
    const handleSubmit = vi .fn()
    const user = userEvent.setup()
    render(<AddingForm handleSubmit={handleSubmit} />)
    const input  = screen.getByRole('textbox')
    const sendButton = screen.getByText ('add')
    await user.type(input,'testing a form...')
    await user.click(sendButton)
    expect(handleSubmit.mock.calls).toHaveLength(1)
    expect(handleSubmit.mock.calls[0][0].content).toBe('testing a form...')

    })
