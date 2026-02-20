import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { College, Response } from '../backend';

export function useGetAllColleges() {
  const { actor, isFetching } = useActor();

  return useQuery<College[]>({
    queryKey: ['colleges'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllColleges();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCollege(collegeId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<College | null>({
    queryKey: ['college', collegeId?.toString()],
    queryFn: async () => {
      if (!actor || collegeId === null) return null;
      return actor.getCollege(collegeId);
    },
    enabled: !!actor && !isFetching && collegeId !== null,
  });
}

export function useAskQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<Response, Error, { question: string; collegeId: bigint }>({
    mutationFn: async ({ question, collegeId }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.askQuestion(question, collegeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userHistory'] });
    },
  });
}

export function useAddCollege() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<
    bigint,
    Error,
    {
      name: string;
      description: string;
      admissionsRequirements: string;
      courses: string[];
      programs: string[];
      campusFacilities: string;
      campusLife: string;
      applicationDeadlines: string;
      tuitionFees: string;
      scholarships: string;
      contactInfo: string;
      faq: Array<{ question: string; answer: string }>;
    }
  >({
    mutationFn: async (college) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addCollege(
        college.name,
        college.description,
        college.admissionsRequirements,
        college.courses,
        college.programs,
        college.campusFacilities,
        college.campusLife,
        college.applicationDeadlines,
        college.tuitionFees,
        college.scholarships,
        college.contactInfo,
        college.faq
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colleges'] });
    },
  });
}
