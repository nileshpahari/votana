
use anchor_lang::prelude::*;
use crate::states::*;
use crate::errors::ErrorCode;

pub fn unregister_candidate(ctx: Context<UnregisterCandidate>, poll_id: u64, cid: u64) -> Result<()> {
    let poll = &mut ctx.accounts.poll;
    let candidate = &mut ctx.accounts.candidate;
    let registrations = &mut ctx.accounts.registrations;

    require!(poll.id == poll_id, ErrorCode::PollDoesNotExist);

    require_keys_eq!(
        candidate.creator,
        ctx.accounts.signer.key(),
        ErrorCode::Unauthorized
    );
    if poll.mode == PollMode::Restricted {
        require_keys_eq!(poll.creator, ctx.accounts.signer.key(), ErrorCode::Unauthorized);
    }
    require!(poll.candidates > 0, ErrorCode::PollCounterUnderflow);
    poll.candidates -= 1;

    require!(registrations.active > 0, ErrorCode::RegistrationsCounterUnderflow);
    registrations.active -= 1;

    Ok(())
}

#[derive(Accounts)]
#[instruction(poll_id: u64, cid: u64)]
pub struct UnregisterCandidate<'info> {
    #[account(
        mut,
        close = signer,
        seeds = [
            b"candidate",
            poll_id.to_le_bytes().as_ref(),
            cid.to_le_bytes().as_ref()
        ],
        bump
    )]
    pub candidate: Account<'info, Candidate>,
    #[account(mut, seeds = [b"poll", poll_id.to_le_bytes().as_ref()], bump)]
    pub poll: Account<'info, Poll>,
    #[account(mut, seeds = [b"registrations"], bump)]
    pub registrations: Account<'info, Registrations>,
    #[account(mut)]
    pub signer: Signer<'info>,
}