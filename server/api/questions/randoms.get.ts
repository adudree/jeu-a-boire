//@ts-ignore
import { serverSupabaseClient } from '#supabase/server';
import { objectKeysToCamel } from '~/server/utils/strings';
import { IQuestion } from '~/types/questions';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const limit = query.limit ? parseInt(query.limit as string, 10) : 5;

  // handle GET requests for the `api/questions/randoms` endpoint
  const supabase = await serverSupabaseClient(event);
  const { data } = await supabase
    .from('random_questions')
    .select('question, question_type')
    .limit(limit);
  const questions: IQuestion[] = data ? data.map(objectKeysToCamel) : [];
  return { questions };
});
