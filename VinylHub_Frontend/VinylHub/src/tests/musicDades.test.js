import { expect, test,describe, beforeEach } from 'vitest'
import { useMusicDadesStore } from '@/stores/musicDades.js'
import { createPinia, setActivePinia } from 'pinia'

describe("MusicDadesStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('get Discover songs, Discover playlists and artists', () => {
        const musicDadesStore = useMusicDadesStore();
        expect(musicDadesStore.currentSong).toBe(null);
        musicDadesStore.noCurrentSong();
        expect(musicDadesStore.currentSong).toBe(null);
       
    })

})
