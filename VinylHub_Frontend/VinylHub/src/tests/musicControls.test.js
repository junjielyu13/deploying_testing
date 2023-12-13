import { expect, test,describe, beforeEach } from 'vitest'
import { useMusicControlsStore } from '@/stores/musicControls.js'
import { createPinia, setActivePinia } from 'pinia'

describe("MusicControlsStore", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('play()', () => {
        const musicControlsStore = useMusicControlsStore();
        expect(musicControlsStore.isPlayingSong).toBe(false);
        musicControlsStore.play();
        expect(musicControlsStore.isPlayingSong).toBe(true);
    })

    test('changeRepeatMode()', () => {
        const musicControlsStore = useMusicControlsStore();
        expect(musicControlsStore.repeatMode).toBe(false);
        musicControlsStore.changeRepeatMode();
        expect(musicControlsStore.repeatMode).toBe(true);
        expect(musicControlsStore.shuffleMode).toBe(false);
        expect(musicControlsStore.repeatOneSongMode).toBe(false);
    })

    test('changeRepeatOneSongMode()', () => {
        const musicControlsStore = useMusicControlsStore();
        expect(musicControlsStore.repeatOneSongMode).toBe(false);
        musicControlsStore.changeRepeatOneSongMode();
        expect(musicControlsStore.repeatOneSongMode).toBe(true);
        expect(musicControlsStore.shuffleMode).toBe(false);
        expect(musicControlsStore.repeatMode).toBe(false);
    })

    test('changeShuffleMode()', () => {
        const musicControlsStore = useMusicControlsStore();
        expect(musicControlsStore.shuffleMode).toBe(false);
        musicControlsStore.changeShuffleMode();
        expect(musicControlsStore.shuffleMode).toBe(true);
        expect(musicControlsStore.repeatOneSongMode).toBe(false);
        expect(musicControlsStore.repeatMode).toBe(false);
    })
})



