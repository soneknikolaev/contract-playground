import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'Store';

import Layout from './Layout';

const Application = memo(() => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Layout />
            </PersistGate>
        </Provider>
    )
});

export default Application;