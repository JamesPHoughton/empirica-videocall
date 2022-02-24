import { JitsiMeeting } from '@jitsi/web-sdk';
import PropTypes from "prop-types";
import React from "react";

export default class Call extends React.PureComponent {

    handleJitsiIFrameRef = iframeRef => {
        iframeRef.style.border = '10px solid cadetblue';
        iframeRef.style.background = 'cadetblue';
        iframeRef.style.height = '400px';
    };

    render () {
        const {roomName, player} = this.props;
        
        return(
            <div>
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName={roomName}
                    onApiReady={externalApi => {this.api = externalApi}}
                    getIFrameRef={this.handleJitsiIFrameRef}
                    userInfo={{displayName: player.get("name")}}
                    configOverwrite={{  // options here: https://github.com/jitsi/jitsi-meet/blob/master/config.js
                        enableWelcomePage: false,  // this doesn't seem to be working...
                        readOnlyName: true,
                        //toolbarButtons: ['camera', 'microphone'],
                        toolbarButtons: ['camera'],
                        enableCalendarIntegration: false
                    }}
                    interfaceConfigOverwrite={{
                        SHOW_CHROME_EXTENSION_BANNER: false,
                        SHOW_JITSI_WATERMARK: false
                    }}
                />
            </div>
        )
    }
}

Call.propTypes = {
    roomName: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
}