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
        js("/vehicles/Vehicle.js")
        js("/vehicles/PlayerVehicle.js")
        js("/vehicles/DroneVehicle.js")
        js("/vehicles/formations/Formation.js")
        js("/vehicles/formations/A5Formation.js")
        js("/vehicles/formations/V5Formation.js")
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
        js("/effects/ExplosionEffect.js")
        groupRef("levels")
    }

    levels {
        js("/levels/Level.js")
        js("/levels/TestLevel.js")
    }
}