export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

interface Entity {
    _id: string
    [key: string]: any

}

function query<T extends Entity>(entityType: string, delay: number = 500): Promise<T[]> {
    const entities: T[] = JSON.parse(localStorage.getItem(entityType) || '[]')
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get<T extends Entity>(entityType: string, entityId: string): Promise<T> {
    return query<T>(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post<T extends Entity>(entityType: string, newEntity: Omit<T, '_id'>): Promise<T> {
    const entityWithId: T = { ...newEntity, _id: _makeId() } as T
    return query<T>(entityType).then(entities => {
        entities.push(entityWithId)
        _save(entityType, entities)
        return entityWithId
    })
}

function put<T extends Entity>(entityType: string, updatedEntity: T): Promise<T> {
    return query<T>(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        
        entities[idx] = { ...entities[idx], ...updatedEntity }
        _save(entityType, entities)
        return entities[idx]
    })
}

function remove(entityType: string, entityId: string): Promise<void> {
    return query<Entity>(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions
function _save(entityType: string, entities: Entity[]): void {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length: number = 5): string {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}