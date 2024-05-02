import { ItemStack, world, system, EntityEquippableComponent, EquipmentSlot } from "@minecraft/server"

const itemsToReplace = [
    "lantern", 
    "redstone_torch",
    "soul_lantern",
    "soul_torch",
    "torch"
]

system.runInterval(() => {
    let players = world.getAllPlayers()

    players.forEach(player => {
        const inventoryComponent = player.getComponent("minecraft:inventory")
        
        itemsToReplace.forEach(f => {
            replaceItems(inventoryComponent.container, `minecraft:${f}`, `outro:${f}`)
        })
    })
})

function replaceItems(inventory, oldTypeId, newTypeId) {
    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i)
        if (item && item.typeId === oldTypeId) {
            const newItem = new ItemStack(newTypeId, item.amount)
            inventory.setItem(i, newItem)
        }
    }
}