import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Divider } from 'react-native-paper';

type CollapsibleFieldProp = {
  title?: string,
  description?: string,
  children: React.ReactNode,
  expandedDefault?: boolean,
};

/**
 * Renders a collapsible field container defaulted to open
 */
const CollapsibleField = ({ children, title, description, expandedDefault = true }: CollapsibleFieldProp): JSX.Element => {

  const [expanded, setExpanded] = useState(expandedDefault);

  useEffect(() => {
    setExpanded(expandedDefault);
  }, [expandedDefault]);

  return (
    <>
      <List.Accordion
        title={title}
        titleStyle={{color: "rgb(80,80,80)"}}
        style={{margin: 0, padding: 0}}
        description={description}
        descriptionStyle={{
          letterSpacing: 0.6,
          padding: 5
        }}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        <View>
          {children}
        </View>

      </List.Accordion>
    </>
  );
};

const styles = StyleSheet.create({
    divider: {
      borderColor: "rgba(0,0,0,0.12)",
      borderWidth: 0.3,
      borderStyle: 'solid',
    },
    collapsibleBody: {
      
      paddingRight: 16,
      paddingBottom: 16,
    },
  });

export default CollapsibleField;
