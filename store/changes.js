export const state = () => ({
    changes: [],
    pendingUndoChange: {},
})

export const mutations = {
    PUSH_CHANGE(state, change) {
        console.log('change: ', change)
        state.changes.push(change)
    },
    POP_CHANGE(state) {
        state.pendingUndoChange = state.changes[state.changes.length - 1]
        state.changes.pop()
    },
    CLEAR_PENDING_CHANGE(state) {
        state.pendingUndoChange = {}
    }
}

export const actions = {
    applyChange({ commit, rootState, dispatch }, changeAction) {

        const currentLayer = rootState.layers.currentItem._id //this probably is going to change when we connect the backend 
        const attributeForm = rootState.attributeForm
        const isAttributeFormValid = rootState.isAttributeFormValid
        const draw = rootState.draw
        const changeType = changeAction.type

        const featureToUpdate = changeAction.features[0];


        switch (changeType) {
            case 'draw.create':
                delete changeAction.target; //target is a map object instance returned by mapbox-draw, we dont need it so it is been deleted to free memory 
                commit('UPDATE_SELECTED_FEATURE', featureToUpdate, { root: true })

                if (isAttributeFormValid) {
                    draw.setFeatureProperty(featureToUpdate.id, 'name', attributeForm.name)
                        .setFeatureProperty(featureToUpdate.id, 'mappedFrom', attributeForm.mappedFrom)
                        .setFeatureProperty(featureToUpdate.id, 'mappedTo', attributeForm.mappedTo)
                        .setFeatureProperty(featureToUpdate.id, 'type', attributeForm.type)
                        .setFeatureProperty(featureToUpdate.id, 'tags', attributeForm.tags)
                        .setFeatureProperty(featureToUpdate.id, 'approved', 'false');

                    commit('UPDATE_ATTRIBUTE_FORM_VALIDITY', false, { root: true })
                    commit('UPDATE_EDITION_STATUS', false, { root: true })
                    commit('CLEAR_ATTRIBUTE_FORM', null, { root: true })
                }
                break;
            case 'draw.update':
                draw.setFeatureProperty(featureToUpdate.id, 'name', attributeForm.name)
                    .setFeatureProperty(featureToUpdate.id, 'mappedFrom', attributeForm.mappedFrom)
                    .setFeatureProperty(featureToUpdate.id, 'mappedTo', attributeForm.mappedTo)
                    .setFeatureProperty(featureToUpdate.id, 'type', attributeForm.type)
                    .setFeatureProperty(featureToUpdate.id, 'tags', attributeForm.tags)
                    .setFeatureProperty(featureToUpdate.id, 'approved', 'false');

                break;
            default:
                break;
        }


        // commit('PUSH_CHANGE', { ...changeAction, layer: currentLayer, year: currentYear })
    },
    undoChange({ commit, state }) {
        commit('POP_CHANGE')
        const { pendingUndoChange } = state

        if (!pendingUndoChange) console.log('There is nothing more to undo') //just return

        console.log('undo action', pendingUndoChange)

        //TODO: Undo action here
        // .
        // .
        // .

        commit('CLEAR_PENDING_CHANGE')
    }
}