import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import PluginProvider from 'mirador/dist/es/src/extend/PluginProvider';
import MiradorApp from 'mirador/dist/es/src/containers/App'
import createStore from 'mirador/dist/es/src/state/createStore'
import createRootReducer from 'mirador/dist/es/src/state/reducers/rootReducer';
import settings from 'mirador/dist/es/src/config/settings'
import * as actions from 'mirador/dist/es/src/state/actions'
import plugin from './plugin'


class Mirador extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const store = createStore()
    store.dispatch(actions.setConfig(settings))
    

    store.dispatch(actions.addWindow({
      id: "window-2",
      manifestId: 'https://iiif.lib.harvard.edu/manifests/ids:16843914',
    }))

    this.setState({ store: store })
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <PluginProvider plugins={this.props.plugins || []} createRootReducer={createRootReducer}>
          <MiradorApp/>
        </PluginProvider>
      </Provider>
    )
  }
}


const container = document.createElement('div')
container.setAttribute('id', 'root')
document.body.appendChild(container)

ReactDOM.render(
  <Mirador plugins={[plugin]} />,
  document.getElementById('root'),
);
