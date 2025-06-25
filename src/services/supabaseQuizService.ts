'use client';
import { supabase } from "@/integrations/supabase/client";
import { Quiz, Question, QuizResult } from "@/types/quiz";
import { PostgrestError } from "@supabase/supabase-js";

export const supabaseQuizService = {
  async createQuiz(quiz: Quiz): Promise<{ success: boolean; error?: string; data?: Quiz }> {
    try {
      // Insert quiz
      const { error: quizError } = await supabase
        .from('quizzes')
        .insert({
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
          thumbnail: quiz.thumbnail,
          theme: quiz.theme,
          kakao_share_enabled: quiz.kakaoShareEnabled,
          shuffle_questions: quiz.shuffleQuestions,
          created_by: quiz.createdBy
        })
        .select()
        .single();

      if (quizError) throw quizError;

      // Insert questions
      const questionsToInsert = quiz.questions.map((question, index) => ({
        id: question.id,
        quiz_id: quiz.id,
        question: question.question,
        context: question.context,
        options: question.options,
        correct_answer: question.correctAnswer,
        explanation: question.explanation,
        correct_rate: question.correctRate,
        original_order: index
      }));

      const { error: questionsError } = await supabase
        .from('questions')
        .insert(questionsToInsert);

      if (questionsError) throw questionsError;

      return { success: true, data: quiz };
    } catch (error) {
      const err = error as PostgrestError;
      console.error('Create quiz error:', err);
      return { success: false, error: err.details };
    }
  },

  async updateQuiz(quiz: Quiz): Promise<{ success: boolean; error?: string; data?: Quiz }> {
    try {
      // Update quiz
      const { error: quizError } = await supabase
        .from('quizzes')
        .update({
          title: quiz.title,
          description: quiz.description,
          thumbnail: quiz.thumbnail,
          theme: quiz.theme,
          kakao_share_enabled: quiz.kakaoShareEnabled,
          shuffle_questions: quiz.shuffleQuestions
        })
        .eq('id', quiz.id);

      if (quizError) throw quizError;

      // Delete existing questions
      const { error: deleteError } = await supabase
        .from('questions')
        .delete()
        .eq('quiz_id', quiz.id);

      if (deleteError) throw deleteError;

      // Insert updated questions
      const questionsToInsert = quiz.questions.map((question, index) => ({
        id: question.id,
        quiz_id: quiz.id,
        question: question.question,
        context: question.context,
        options: question.options,
        correct_answer: question.correctAnswer,
        explanation: question.explanation,
        correct_rate: question.correctRate,
        original_order: index
      }));

      const { error: questionsError } = await supabase
        .from('questions')
        .insert(questionsToInsert);

      if (questionsError) throw questionsError;

      return { success: true, data: quiz };
    } catch (error) {
      const err = error as PostgrestError;
      console.error('Create quiz error:', err);
      return { success: false, error: err.details };
    }
  },

  async getQuiz(quizId: string): Promise<Quiz | null> {
    try {
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .single();

      if (quizError) throw quizError;

      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', quizId)
        .order('original_order');

      if (questionsError) throw questionsError;

      const questions: Question[] = questionsData.map(q => ({
        id: q.id,
        question: q.question,
        context: q.context || '',
        options: Array.isArray(q.options) ? q.options.map(option => String(option)) : [],
        correctAnswer: q.correct_answer,
        explanation: q.explanation || '',
        correctRate: q.correct_rate || 0
      }));

      const quiz: Quiz = {
        id: quizData.id,
        title: quizData.title,
        description: quizData.description || '',
        thumbnail: quizData.thumbnail || '',
        questions,
        theme: typeof quizData.theme === 'object' && quizData.theme !== null 
          ? quizData.theme as { primaryColor: string }
          : { primaryColor: "#21CA86" },
        createdAt: new Date(quizData.created_at),
        createdBy: quizData.created_by || '',
        kakaoShareEnabled: quizData.kakao_share_enabled|| false,
        shuffleQuestions: quizData.shuffle_questions || false
      };

      return quiz;
    } catch (error) {
      const err = error as PostgrestError;
      console.error('Create quiz error:', err);
      return null;
    }
  },

  async getAllQuizzes(): Promise<Quiz[]> {
    try {
      const { data: quizzesData, error: quizzesError } = await supabase
        .from('quizzes')
        .select(`
          *,
          questions (count)
        `)
        .order('created_at', { ascending: false });

      if (quizzesError) throw quizzesError;

      return quizzesData.map(quiz => ({
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        thumbnail: quiz.thumbnail,
        questions: [],
        theme: typeof quiz.theme === 'object' && quiz.theme !== null 
          ? quiz.theme as { primaryColor: string }
          : { primaryColor: "#21CA86" },
        createdAt: new Date(quiz.created_at),
        createdBy: quiz.created_by,
        kakaoShareEnabled: quiz.kakao_share_enabled,
        shuffleQuestions: quiz.shuffle_questions,
        questionCount: quiz.questions?.[0]?.count || 0
      } as Quiz));
    } catch (error) {
      console.error('Get all quizzes error:', error);
      return [];
    }
  },

  async saveQuizResult(result: QuizResult, sessionId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('quiz_results')
        .insert({
          quiz_id: result.quizId,
          session_id: sessionId,
          answers: result.answers,
          score: result.score,
          completed_at: result.completedAt.toISOString()
        });

      if (error) throw error;

      return { success: true };
    } catch (error) {
      const err = error as PostgrestError;
      console.error('Create quiz error:', err);
      return { success: false, error: err.details };
    }
  },

  async getQuizResult(testId: string, sessionId: string): Promise<QuizResult | null> {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('quiz_id', testId)
        .eq('session_id', sessionId)
        .single();

      if (error) throw error;

      return {
        quizId: data.quiz_id,
        answers: data.answers,
        score: data.score,
        completedAt: new Date(data.completed_at)
      };
    } catch (error) {
      console.error('Get quiz result error:', error);
      return null;
    }
  },

  async deleteQuiz(quizId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Delete questions first (due to foreign key constraint)
      const { error: questionsError } = await supabase
      .from('questions')
      .delete()
      .eq('quiz_id', quizId);
      
      if (questionsError) throw questionsError;
      
      // Delete quiz
      const { error: quizError, } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', quizId);
      
      if (quizError) throw quizError;

      return { success: true };
    } catch (error) {
      const err = error as PostgrestError;
      console.error('Create quiz error:', err);
      return { success: false, error: err.details };
    }
  },

  async shuffleQuestions(quizId: string, sessionId: string): Promise<number[]> {
    try {
      const { data: questionsData } = await supabase
        .from('questions')
        .select('original_order')
        .eq('quiz_id', quizId)
        .order('original_order');

      if (!questionsData) return [];

      const originalOrder = questionsData.map(q => q.original_order);
      const shuffledOrder = [...originalOrder].sort(() => Math.random() - 0.5);

      // Save the shuffled order for this session
      await supabase
        .from('user_quiz_sessions')
        .insert({
          quiz_id: quizId,
          session_id: sessionId,
          question_order: shuffledOrder
        });

      return shuffledOrder;
    } catch (error) {
      console.error('Shuffle questions error:', error);
      return [];
    }
  }
};
