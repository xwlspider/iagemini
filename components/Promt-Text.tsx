import React from "react";
import { TextInput, View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

interface PromptTextProps {
  value: string;
  onChangeText: (text: string) => void;
}

const PromptText = ({ value, onChangeText }: PromptTextProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-black">
        <View className="relative">
          {/* Borde decorativo superior */}
          <View className="absolute top-0 left-0 right-0 h-0.5 bg-red-600" />
          
          <TextInput
            editable
            multiline
            numberOfLines={4}
            onChangeText={onChangeText}
            value={value}
            placeholder="Escribe tu pregunta sobre Marvel..."
            placeholderTextColor="#dc2626"
            className="bg-zinc-900 border-2 border-red-600/50 rounded-xl p-4 text-gray-100 text-base min-h-32 shadow-lg"
            style={{
              textAlignVertical: 'top',
              shadowColor: '#dc2626',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            }}
          />
          
          {/* Borde decorativo inferior */}
          <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
          
          {/* Indicador de esquina estilo tech */}
          <View className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-500" />
          <View className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-500" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PromptText;