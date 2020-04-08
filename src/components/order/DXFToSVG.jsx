import React from 'react';

export default class DXFToSVG extends React.Component {
    state = {
        SVG: "Loading..."
    }
    render() {
        const { file } = this.props;
        window.requirejs(['./dxf'], dxf => {
            let reader = new FileReader();
            reader.onload = e => {
                if (e.target.readyState === 2) {
                    let dxfContents = e.target.result;
                    let helper = new dxf.Helper(dxfContents);
                    const svg = helper.toSVG();
                    this.setState({SVG: svg});
                }
            };
            reader.readAsBinaryString(file);
        });
        return (
            <div style={{width: '100%', height: '100%', overflow: 'auto'}} dangerouslySetInnerHTML={{__html: this.state.SVG}} />
        )
    }
}