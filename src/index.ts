import moment ,{ Duration ,Moment , } from 'moment'
import { pito ,  } from 'pito'

/*
 * Moment, datetime
 * moment, date
 */
export type MomentExtra = Record<string ,unknown>
export type MomentOption = Record<string ,unknown>
export type MomentSchema<Format extends 'date' | 'date-time'> = {
    type: 'string'
    format: Format
}
export type PitoMoment<Format extends 'date' | 'date-time'> = pito<string ,Moment ,MomentSchema<Format> ,MomentOption ,MomentExtra>
export const PitoMoment = <Format extends 'date' | 'date-time'>(format: Format ,): PitoMoment<Format> => {
    return {
        type:   'string' ,
        format: format ,
        $wrap(data ,) {
            if (this.format === 'date') return data.format('YYYY-MM-DD' ,)
             
            return data.format('YYYY-MM-DDThh:mm:ssZ' ,)
            
        } ,
        $unwrap(raw ,) { return moment(raw ,true ,) } ,
        $strict() {
            return {
                type:   'string' ,
                format: format ,

            }
        } ,
        $bypass() { return false } ,
        $typeof: 'any' , // Currently, there is no interface support
    }
}
// Moment, duration
export type MomentDurationExtra = Record<string ,unknown>
export type MomentDurationOption = Record<string ,unknown>
export type MomentDurationSchema = {
    type: 'string' ,
    format: 'duration'
}
export type PitoMomentDuration = pito<string ,Duration ,MomentDurationSchema ,MomentDurationOption ,MomentDurationExtra>
export const PitoMomentDuration = (): PitoMomentDuration => {
    return {
        type:   'string' ,
        format: 'duration' ,
        $wrap(data ,) { return data.toISOString() } ,
        $unwrap(raw ,) { return moment.duration(raw ,) } ,
        $strict() {
            return {
                type:   'string' ,
                format: 'duration' ,
            }
        } ,
        $bypass() { return false } ,
        $typeof: 'any' , // Currently, there is no interface support
    }
}

export const Plugin = {
    Moment:   PitoMoment ,
    Duration: PitoMomentDuration ,
}
export default Plugin
