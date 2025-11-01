'use server';
/**
 * @fileOverview AI-powered product recommendations based on browsing history and cart contents.
 *
 * - getRecommendations - A function to fetch product recommendations.
 * - RecommendationInput - The input type for the getRecommendations function.
 * - RecommendationOutput - The output type for the getRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe('A comma-separated list of product IDs representing the user\'s browsing history.'),
  cartContents: z
    .string()
    .describe('A comma-separated list of product IDs currently in the user\'s cart.'),
});
export type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

const RecommendationOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of product IDs recommended to the user.'),
});
export type RecommendationOutput = z.infer<typeof RecommendationOutputSchema>;

export async function getRecommendations(input: RecommendationInput): Promise<RecommendationOutput> {
  return recommendationsFlow(input);
}

const productRecommendationTool = ai.defineTool(
  {
    name: 'getProductRecommendations',
    description: 'Suggests related or similar items to users based on their browsing history and cart contents.',
    inputSchema: z.object({
      browsingHistory: z
        .string()
        .describe('A comma-separated list of product IDs representing the user\'s browsing history.'),
      cartContents: z
        .string()
        .describe('A comma-separated list of product IDs currently in the user\'s cart.'),
    }),
    outputSchema: z.array(z.string()).describe('A list of recommended product IDs.'),
  },
  async (input) => {
    // Dummy implementation: Replace with actual recommendation logic.
    const allProducts = ['dress123', 'shoes456', 'shirt789', 'pants012', 'skirt345', 'coat567', 'blouse890', 'suit111', 'sweater222'];
    const recommendedProducts = allProducts.filter(
      product => !input.browsingHistory.includes(product) && !input.cartContents.includes(product)
    );
    return recommendedProducts;
  }
);

const recommendationsPrompt = ai.definePrompt({
  name: 'recommendationsPrompt',
  tools: [productRecommendationTool],
  input: {schema: RecommendationInputSchema},
  output: {schema: RecommendationOutputSchema},
  prompt: `Based on the user's browsing history: {{{browsingHistory}}} and cart contents: {{{cartContents}}}, suggest related or similar items the user might be interested in. Use the getProductRecommendations tool.
`,
});

const recommendationsFlow = ai.defineFlow(
  {
    name: 'recommendationsFlow',
    inputSchema: RecommendationInputSchema,
    outputSchema: RecommendationOutputSchema,
  },
  async input => {
    const {output} = await recommendationsPrompt(input);
    return {
      recommendations: output?.recommendations ?? [],
    };
  }
);
