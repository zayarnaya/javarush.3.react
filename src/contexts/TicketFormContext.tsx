import { createContext } from "react"

export interface TicketFormValues {
    type: 'round' | 'one-way',
    passengers: number,
    departure: string,
    arrival: string,
    date: string[],
}

export type TicketFormValuesPartial = Partial<TicketFormValues>

export const initialFormState: TicketFormValuesPartial = {
    type: 'round',
    passengers: 1,
}

export interface TicketFormContextProps {
    values: TicketFormValuesPartial,
    setValues: (values: TicketFormValuesPartial) => void
}

export const TicketFormContext = createContext<TicketFormContextProps>({
    values: initialFormState,
    //@ts-expect-error
    setValues: (values: TicketFormValuesPartial) => {}
})