import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NoteItem from '../Noteitem.vue'

describe('NoteItem.vue', () => {
    it('stellt den Produktnamen und Preis korrekt dar', () => {
        const product = { id: 1, name: 'Test Laptop', price: 999.99 }
        const wrapper = mount(NoteItem, {
            props: { noteData: product }
        })

        // Prüfen, ob der Name im HTML vorkommt
        expect(wrapper.text()).toContain('Test Laptop')
        // Prüfen, ob der Preis angezeigt wird
        expect(wrapper.text()).toContain('999.99')
    })

    it('emittiert ein Delete-Event beim Klick auf den Löschen-Button', async () => {
        const product = { id: 1, name: 'Test Laptop', price: 999.99 }
        const wrapper = mount(NoteItem, {
            props: { noteData: product }
        })

        // Klick auf den Lösch-Button simulieren
        await wrapper.find('.delete-btn').trigger('click')

        // Prüfen, ob das 'delete' Event mit der richtigen ID gefeuert wurde
        expect(wrapper.emitted().delete[0]).toEqual([1])
    })
})