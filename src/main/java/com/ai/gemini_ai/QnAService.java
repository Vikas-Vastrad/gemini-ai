package com.ai.gemini_ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class QnAService {
//Access to APIkey and URL
    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;

    public QnAService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }

    public String getAnswer(String question) {
    // Constructing the request payload: {
    //  "contents": [{
    //    "parts":[{"text": "Explain how AI works"}]
    //    }]
    //   }
        Map<String, Object> requestBody = Map.of(
                "contents",new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", question)
                        })
                }
        );
        // make api call
        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()//execute request and get response
                .bodyToMono(String.class)//converting response to strings
                .block();
        // return response
        return response;
    }
}
