var Taka = (Taka) ? Taka : {};

/**
 * @namespace
 */
Taka.core.Config = {
    /**
     * The url of the resources directory (ending in a slash)
     * @type string
     */
    resourcesBaseUrl : 'src/main/resources/',
    /**
     * The target frames per second for the game engine
     */
    fps: 60,
    /**
     * A map of the keycodes for the various controls
     * @enum
     */
    buttons: {
        /**
         * The keycode for moving the player up
         * @type integer
         */
        up: 38,
        /**
         * The keycode for moving the player down
         * @type integer
         */
        down: 40,
        /**
         * The keycode for moving the player left
         * @type integer
         */
        left: 37,
        /**
         * The keycode for moving the player right
         * @type integer
         */
        right: 39,
        /**
         * The keycode for firing the player's guns
         * @type integer
         */
        fire: 32,
        /**
         * The keycode for pausing the game
         * @type integer
         */
        pause: 27
    }
};