import React from 'react';

class Component {
    Async(importComponentFn) {
        class AsyncComponent extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    component: null
                }
            }

            async componentDidMount() {
                const { default: component } = await importComponentFn();

                this.setState({
                    component
                })
            }
            
            render() {
                return this.state.component ? <this.state.component {...this.props} /> : null
            }
        }

        return AsyncComponent;
    }

}

export default new Component();