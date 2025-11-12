import Button from "@/components/Button";
import PromptText from "@/components/Promt-Text";
import axios from "axios";
import { useState } from "react";
import { Alert, Animated, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

export default function Index() {

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  // 💡 IA enfocada en MARVEL
  const consultarGemini = async (pregunta: string) => {
    if (!pregunta.trim()) return Alert.alert("⚠️ Atención", "Escribe una pregunta sobre el universo Marvel.");
    
    setIsLoading(true);
    setResponse("");
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.95);

    try {
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: `
Eres una inteligencia artificial experta en el universo MARVEL. 
Responde de forma clara, interesante y actualizada sobre películas, cómics y personajes. 
No inventes datos falsos. Si no sabes algo, indícalo. 
Pregunta del usuario: ${pregunta}
                  `,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": API_KEY,
          },
        }
      );

      const text = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No encontré información sobre eso.";
      setResponse(text);
      
      // Animaciones combinadas
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: false,
        })
      ]).start();

    } catch (error: any) {
      console.error(error);
      Alert.alert("❌ Error", error.message || "Hubo un problema al consultar la IA.");
    } finally {
      setValue("");
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header épico Marvel */}
        <View className="bg-gradient-to-b from-red-900/30 to-transparent pt-16 pb-8 px-5">
          <View className="items-center">
            {/* Título principal con efectos */}
            <View className="relative">
              <Text className="text-red-600 text-5xl font-black mb-1 text-center">
                MARVEL
              </Text>
              <View className="absolute -bottom-1 left-0 right-0 h-1 bg-red-600 rounded-full" />
            </View>
            
            <Text className="text-white text-2xl font-bold mt-3 ">
              AI ASSISTANT
            </Text>
            
            <View className="flex-row items-center mt-4 bg-red-600/20 px-4 py-2 rounded-full border border-red-600/40">
              <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
              <Text className="text-red-400 text-xs font-semibold">
                POWERED BY GEMINI
              </Text>
            </View>

            {/* Decoraciones laterales */}
            <View className="flex-row justify-between w-full mt-6 px-10">
              <View className="w-12 h-0.5 bg-red-600" />
              <View className="w-2 h-2 bg-red-500 rounded-full" />
              <View className="w-12 h-0.5 bg-red-600" />
            </View>
          </View>
        </View>

        <ScrollView 
          className="flex-1 bg-black"
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
          showsVerticalScrollIndicator={true}
          indicatorStyle="white"
        >
          {/* Input con diseño mejorado */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3">
              <View className="w-1 h-4 bg-red-600 mr-2" />
              <Text className="text-red-400 text-sm font-bold uppercase">
                Tu pregunta
              </Text>
            </View>
            <PromptText
              onChangeText={(text) => setValue(text)}
              value={value}
            />
          </View>

          {/* Botón con diseño heroico */}
          <Button
            title={isLoading ? "ANALIZANDO..." : "ACTIVAR IA"}
            isLoading={isLoading}
            onPress={() => consultarGemini(value)}
            variant="danger"
            className="shadow-lg shadow-red-900/50"
          />

          {/* Respuesta con animaciones mejoradas */}
          {response && (
            <Animated.View 
              style={{ 
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }}
              className="mt-8"
            >
              {/* Badge superior */}
              <View className="flex-row justify-center mb-3">
                <View className="bg-red-600/20 px-4 py-1.5 rounded-full border border-red-600/50">
                  <Text className="text-red-400 text-xs font-bold">
                    ⚡ RESPUESTA GENERADA ⚡
                  </Text>
                </View>
              </View>

              {/* Contenedor de respuesta */}
              <View className="bg-zinc-900 border-2 border-red-600/40 rounded-3xl p-6 relative overflow-hidden">
                {/* Efecto de esquinas */}
                <View className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500" />
                <View className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500" />
                <View className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500" />
                <View className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500" />

                {/* Header de respuesta */}
                <View className="flex-row items-center mb-4 pb-3 border-b border-red-600/30">
                  <View className="w-3 h-3 bg-red-500 rounded-full mr-3" />
                  <Text className="text-red-400 text-xs font-black uppercase">
                    Análisis Completo
                  </Text>
                </View>

                {/* Contenido scrolleable */}
                <ScrollView 
                  className="max-h-96"
                  showsVerticalScrollIndicator={true}
                  indicatorStyle="white"
                  nestedScrollEnabled={true}
                >
                  <Text className="text-gray-100 text-base leading-7">
                    {response}
                  </Text>
                </ScrollView>
              </View>
            </Animated.View>
          )}

          {/* Espaciado final */}
          <View className="h-20" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}