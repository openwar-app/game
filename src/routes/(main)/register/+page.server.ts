import type { PageServerLoad } from './$types';
import Races from '$lib/shared/races';
export const load: PageServerLoad = ({ params }) => {
    return {
        races: Races.getRaces().map(r => r.raceName)
    };
};