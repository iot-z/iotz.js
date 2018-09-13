import { Observable, ObservableFn } from 'iotz-util-observable/src/observable';

export default {
  _state: {},
  _actions: {},

  init(fn) {
    window.addEventListener('message', function(e) {
      const data = e.data;

      if (data.type == 'create') {
        this._state = Observable(data.state, (prop, oldVal, val) => {
          parent.postMessage({
            type: 'state',
            moduleId: data.moduleId,
            prop,
            val,
          }, '*');
        });

        this._actions = ObservableFn(data.actions, (action, params) => {
          parent.postMessage({
            type: 'actions',
            moduleId: data.moduleId,
            action,
            params,
          }, '*');
        });

        fn(this._state);
       } else if (data.type == 'state') {
        this._state.set(data.prop, data.val, false);
      }
    });
  }
}
