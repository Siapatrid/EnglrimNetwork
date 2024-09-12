import React from 'react'
import ProfileStatus from './PtofileStatus'
import { create } from 'react-test-renderer'

describe('ProfileStatus component', () => {
    test('Status from props should be in the state', () => {
        const component = create(<ProfileStatus status="engldom.edu" />)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('engldom.edu')
    })
})

// Это тест с использованием реакт тест рендерера, который не установился из-за зависимостей.
