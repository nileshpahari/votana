use anchor_lang::prelude::*;
use crate::states::*;
use crate::errors::ErrorCode;

pub fn close_poll(ctx: Context<ClosePoll>, poll_id: u64) -> Result<()> {
    let poll = &ctx.accounts.poll;
    let counter = &mut ctx.accounts.counter;

    require_keys_eq!(
        poll.creator,
        ctx.accounts.signer.key(),
        ErrorCode::Unauthorized
    );

    let now_ts = Clock::get()?.unix_timestamp as u64;
    require!(now_ts >= poll.end, ErrorCode::PollStillActive);

    require!(counter.active > 0, ErrorCode::VotesCounterUnderflow);

    counter.active-=1;
    Ok(())
}

#[derive(Accounts)]
#[instruction(poll_id: u64)]
pub struct ClosePoll<'info> {
    #[account(
        mut,
        close = signer,
        seeds = [
            b"poll",
            poll_id.to_le_bytes().as_ref()
        ],
        bump
    )]
    pub poll: Account<'info, Poll>,
    #[account(mut, seeds = [b"counter"], bump)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub signer: Signer<'info>,
}
