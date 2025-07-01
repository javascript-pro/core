import {
    TLanguageCode,
} from './types';

export const translations: Record<string, Record<TLanguageCode, string>> = {
    back: {
        en: 'Back',
        de: 'Zurück',
    },
    caseEdit: {
        en: 'Edit Case',
        de: 'Fall bearbeiten',
    },
    caseList: {
        en: 'Cases',
        de: 'Fälle',
    },
    caseView: {
        en: 'View Case',
        de: 'Fallansicht',
    },
    noDescription: {
        en: 'No description available',
        de: 'Kein Beschreibungstext verfügbar',
    },
    notFound: {
        en: 'Not found',
        de: 'Nicht gefunden',
    },
};