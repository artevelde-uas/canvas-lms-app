import { Table } from '@instructure/ui-table';
import { ToggleDetails } from '@instructure/ui-toggle-details'
import { Text } from '@instructure/ui-text'
import { IconButton } from '@instructure/ui-buttons'
import { IconPublishSolid } from '@instructure/ui-icons'

import { EmotionThemeProvider } from '@instructure/emotion';
import { theme } from '@artevelde-uas/canvas-lms-app';


export default ({ plugins }) => (
    <EmotionThemeProvider theme={theme}>
        <Table caption='Plugin list'>
            <Table.Head>
                <Table.Row>
                    <Table.ColHeader id='plugin' width='100%'>
                        Plug-in
                    </Table.ColHeader>
                    <Table.ColHeader id='status'>
                        Status
                    </Table.ColHeader>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {plugins.map(plugin => {
                    if (plugin === undefined) return;

                    const title = plugin?.title || plugin.description;
                    const description = plugin?.title && plugin.description;

                    return (
                        <Table.Row key={plugin.name}>
                            <Table.Cell id='plugin'>
                                {description ? (
                                    <ToggleDetails
                                        summary={title}
                                    >
                                        <Text>{description}</Text>
                                    </ToggleDetails>
                                ) : (
                                    <Text>{title}</Text>
                                )}
                            </Table.Cell>
                            <Table.Cell id='status'>
                                <IconButton
                                    color='success'
                                    withBorder={false}
                                    withBackground={false}
                                    interaction='readonly'
                                    screenReaderLabel={title}
                                >
                                    <IconPublishSolid />
                                </IconButton>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    </EmotionThemeProvider>
);
