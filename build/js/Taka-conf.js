/**
 * @namespace
 */
var TakaConfig = {
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
         * @type number
         */
        up: 38,
        /**
         * The keycode for moving the player down
         * @type number
         */
        down: 40,
        /**
         * The keycode for moving the player left
         * @type number
         */
        left: 37,
        /**
         * The keycode for moving the player right
         * @type number
         */
        right: 39,
        /**
         * The keycode for firing the player's guns
         * @type number
         */
        fire: 32,
        /**
         * The keycode for pausing the game
         * @type number
         */
        pause: 27
    }
};