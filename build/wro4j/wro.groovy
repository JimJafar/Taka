// format guide: http://code.google.com/p/wro4j/wiki/WroFileFormat
groups {
    Taka {
        js("/Taka.js")
        groupRef("utils")
    }

    utils {
        js("/utils/BoxUtil.js")
        groupRef("core")
    }

    core {
        js("/core/Config.js")
        js("/core/Control.js")
        js("/core/Engine.js")
        js("/core/Renderer.js")
        js("/core/Timer.js")
        groupRef("assets")
    }

    assets {
        js("/assets/Cache.js")
        js("/assets/Assets.js")
        groupRef("vehicles")
    }

    vehicles {
        js("/vehicles/Ship.js")
        js("/vehicles/Player.js")
        js("/vehicles/Drone.js")
        js("/vehicles/formations/Formation.js")
        js("/vehicles/formations/A5.js")
        js("/vehicles/formations/V5.js")
        groupRef("ordnance")
    }

    ordnance {
        js("/ordnance/Bullet.js")
        js("/ordnance/PlayerBullet.js")
        js("/ordnance/SmallBullet.js")
        groupRef("effects")
    }

    effects {
        js("/effects/Effect.js")
        js("/effects/Explosion.js")
        groupRef("levels")
    }

    levels {
        js("/levels/Level.js")
        js("/levels/Test.js")
    }
}